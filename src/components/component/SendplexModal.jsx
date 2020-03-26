import React from 'react';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Row
} from "reactstrap";
import PropTypes from 'prop-types';
import imageLoader from "../../assets/images/modal-loader.gif"
  
const SendplexModal = (props) => {
    const {
        toggle,
        isOpen,
        className,
        confirmAction,
        modalLoader,
        inputHandler,
        modalContent,
        values
    } = props;

    return <Modal isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{modalContent.title}</ModalHeader>
        <ModalBody>
            <div className={modalLoader?'modal-loading d-block':'modal-loading d-none'}><img src={imageLoader} /></div>
            <div className={modalContent.type}>
            {(modalContent.type == "form") && modalContent.body.map((sItem, k) => 
                <div className={`form-group ${sItem.className}`} key={k}>
                    <label htmlFor="list-name" className={`control-label" ${sItem.className}`}>{sItem.label}:</label>
                    {(sItem.type == "input") &&
                    <input type="text" className={`form-control ${sItem.className}`} name={sItem.name} id={`modal_${sItem.name}`} onChange={inputHandler} value={values[sItem.name]} placeholder={sItem.placeholder} {...sItem.attrs} />
                    }
                    {(sItem.type == "select") &&
                    <select type="text" className={`form-control ${sItem.className}`} name={sItem.name} id={`modal_${sItem.name}`} onChange={inputHandler} value={values[sItem.name]} placeholder={sItem.placeholder} {...sItem.attrs} >
                        {sItem.attrs.options.map((option, ko) => 
                            <option value={option.value} key={ko}>{option.name}</option>
                        )}
                    </select>
                    }
                    <p className="login-form-error">{modalContent.message[sItem.name]}</p>
                </div>
            )}
            {(modalContent.type == "text") &&  Object.keys(values).map((key, k) => 
                <p className="control-label" key={k}>{key}: {values[key]}</p>
            )}
            </div>
        </ModalBody>
        <ModalFooter>
            <Button color={modalContent.button.color} className={modalContent.button.className} onClick={confirmAction}>
                {modalContent.button.text}
            </Button>{" "}
            <Button color='secondary' onClick={toggle}>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>;
};

SendplexModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    isOpen: PropTypes.bool,
    className: PropTypes.string,
    confirmAction: PropTypes.func.isRequired,
    modalLoader: PropTypes.bool,
    inputHandler: PropTypes.func.isRequired,
    modalContent: PropTypes.object.isRequired,
    values: PropTypes.object
};
  
export default SendplexModal;