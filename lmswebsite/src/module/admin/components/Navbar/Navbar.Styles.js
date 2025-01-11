// AppBarWrap.js
import styled from "styled-components";
import { media } from "../../../../style/theme/theme";

export const AppBarWrap = styled.div`
  box-shadow: 0 0.125rem 0.25rem rgba(165, 163, 174, 0.3);
  padding: 8px;
  border-radius: 6px;
  max-width: 100%;
  background-color: ${(props) => props.theme.colors.white};

   .menuItem{
  display: flex !important;
  justify-content: space-between !important;
  align-items: center!important;
  gap: 10px;
  }

.notification-item {
  display: flex !important;
  justify-content: space-between !important;
  align-items: center!important;
  padding: 12px;
  margin-bottom: 12px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
}
 
.notification-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.status-icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.bg-yellow-500{
background-color: #f59e0b;
}
.bg-green-500{
  background-color: #10b981;
}
.bg-red-500{
  background-color: #ef4444;
}
  .bg-green-100{
    background-color: #dcfce7;}
    .bg-yellow-100{
      background-color: #fef9c3;
    }

.clear-all-btn {
  width: 100%;
  padding: 12px;
  background-color: #ff4747;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.clear-all-btn:hover {
  background-color: #ff1c1c;
}

.notification-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.clear-btn {
  font-size: 14px;
  color: #bbb;
  padding: 0;
  background: transparent;
  border: none;
}

.clear-btn:hover {
  color: #ff4747; /* Color on hover */
}

.icon-btn-dot {
  width: 6px;
  height: 6px;
  background-color: red;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
}

  ${media.xxxl`
    padding: 14px 12px;
    margin: 12px;
  `};

  .appbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
  }

  .appbar-left,
  .appbar-right {
    display: flex;
    align-items: center;
    column-gap: 12px;
  }

  .appbar-title {
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.cadet};

    ${media.lg`
      display: none;
    `}
  }

  .appbar-breadcrumb {
    flex-grow: 1;
    text-align: center;

    ${media.lg`
      text-align: left;
    `}
  }

  /* ... Rest of your styled-components styles ... */
`;
