import React, { useEffect, useState } from 'react';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom'; // Ensure react-router-dom is installed and configured
import { getBoards } from '../../api/boardApi';
import { getClassesByBoardId } from '../../api/classApi';
import { getPackageByClassId } from '../../api/packagesApi';

const DynamicMenu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [current, setCurrent] = useState('');

  useEffect(() => {
    const apiCaller = async () => {
      try {
        // 1. Fetch all boards
        const boards = await getBoards();
        //console.log("Fetched Boards:", boards);

        // 2. Initialize the top-level "Explore Courses" menu item
        const exploreCoursesItem = {
          label: 'Explore Courses',
          key: 'explore_courses',
          icon: <MailOutlined />, // You can choose a more appropriate icon if desired
          children: [],
        };

        // 3. Fetch all classes for each board concurrently
        const classesPromises = boards.map(board => getClassesByBoardId(board._id));
        const classesResults = await Promise.all(classesPromises);

        // 4. Flatten the classes array and map them to their respective boards
        const boardIdToClasses = {};
        boards.forEach((board, index) => {
          boardIdToClasses[board._id] = classesResults[index];
        });

        // 5. Fetch all packages for each class concurrently
        const packagesPromises = classesResults.flat().map(cls => 
          Promise.all([
            getPackageByClassId(cls._id, 'normal'),
            getPackageByClassId(cls._id, 'personal'),
          ])
        );
        const packagesResults = await Promise.all(packagesPromises);
        //console.log("Fetched Packages: 1234567 ", packagesResults);

        // 6. Map packages to their respective classes
        const classIdToPackages = {};
        classesResults.flat().forEach((cls, index) => {
          classIdToPackages[cls._id] = {
            normal: packagesResults[index][0],
            personal: packagesResults[index][1],
          };
        });

        // 7. Build the menu structure
        for (const board of boards) {
          const classes = boardIdToClasses[board._id];
          if (!classes) continue; // Skip if no classes found for the board

          const boardItem = {
            label: board.name,
            key: `board_${board._id}`,
            children: [],
          };

          for (const cls of classes) {
            const packages = classIdToPackages[cls._id];
            const classItem = {
              label: cls.className,
              key: `class_${cls._id}`,
              children: [],
            };

            // Add Normal Package
            if (packages.normal) {
              classItem.children.push({
                label: <Link to={`/packages/${packages.normal._id}`}>Normal Package</Link>,
                key: `package_normal_${packages.normal._id}`,
              });
            }

            // Add Personal Package
            if (packages.personal) {
              classItem.children.push({
                label: <Link to={`/packages/${packages.personal._id}`}>Personal Package</Link>,
                key: `package_personal_${packages.personal._id}`,
              });
            }

            // Add the class item to the board's children
            boardItem.children.push(classItem);
          }
           //console.log('boardItem', boardItem);
          // Add the board item to the "Explore Courses" menu
          exploreCoursesItem.children.push(boardItem);
        }

        // 8. Update the menuItems state with the constructed menu
        setMenuItems([exploreCoursesItem]);
        setCurrent('explore_courses'); // Optionally set a default selected key

      } catch (error) {
        //console.error("Error fetching menu data:", error);
      }
    };

    apiCaller();
  }, []);

  useEffect(() => {
    const apiCaller=async()=>{
       const boardData= await getBoards();
       //console.log(" sdfghj",boardData);
       const classData= await getClassesByBoardId("67515a9984ee0be15b5e6797");
       //console.log(" classData",classData);
       
       const normalPackageData= await getPackageByClassId("67515b1284ee0be15b5e67a1","normal");
       //console.log(" normalPackageData",normalPackageData);
       const personalPackageData= await getPackageByClassId("67515b1284ee0be15b5e67a1","personal");
       //console.log(" personalPackageData",personalPackageData);
    } 
    apiCaller();
     
 },[])
  

  const onClick = (e) => {
    //console.log('Menu Clicked:', e);
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={menuItems}
    />
  );
};

export default DynamicMenu;
