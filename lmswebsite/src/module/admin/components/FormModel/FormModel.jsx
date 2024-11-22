// import React from 'react'
// import { FormModelWrap } from './FormModel.styles'
// import CloseIcon from "@mui/icons-material/Close"

// export default function FormModel({ isOpen, onClose, children }) {
//     if (!isOpen) return null;
//     return (
//         <FormModelWrap>
//             <div className="Form-model-overlay">
//                 <div className="Form-model-container">

//                     <button className="Form-model-close-btn" onClick={onClose}> <CloseIcon /></button>
//                     {children}
//                 </div>
//             </div>
//         </FormModelWrap>
//     )
// }



import React from 'react';
import { styled } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';

const FormModelWrap = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const FormModelContent = styled('div')({
    position: 'relative',
    borderRadius: '8px',
    width: '800px',
});

export default function FormModel({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <FormModelWrap>
            <FormModelContent>
                {children}
                <button className="Form-model-close-btn" onClick={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                    <CloseIcon />
                </button>
            </FormModelContent>
        </FormModelWrap>
    );
}