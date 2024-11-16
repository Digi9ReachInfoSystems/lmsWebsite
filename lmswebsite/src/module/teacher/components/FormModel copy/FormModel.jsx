import React from 'react'
import { FormModelWrap } from './FormModel.styles'
import CloseIcon from "@mui/icons-material/Close"

export default function FormModel({ isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <FormModelWrap>
            <div className="Form-model-overlay">
                <div className="Form-model-container">

                    <button className="Form-model-close-btn" onClick={onClose}> <CloseIcon /></button>
                    {children}
                </div>
            </div>
        </FormModelWrap>
    )
}
