import { useEffect, useState } from 'react';
import {Modal,Input} from 'antd';

import { useSaveEmployeesMutation, useUpdateEmployeeMutation } from '../../slices/apislice';

import styles from './AddEditModal.module.css';

const AddEditModal = (props:any) => {
    const {isVisible, changeIsVisible,editData,changeEditData} = props

    const [titleText, setTitleText] = useState(editData?.title ?? '')
    const [descriptionText, setDescriptionText] = useState(editData?.description ?? '')

    const [createIssue,{isLoading:saveIsLoading}] = useSaveEmployeesMutation()
    const [updateIssue,{isLoading:updateIsLoading}] = useUpdateEmployeeMutation()

    //on Cancel Button Click Event
    const onCancel = () => {
        changeIsVisible(false) 
        changeEditData(null)
        setTitleText('')
        setDescriptionText('')
    }

    const onSubmit = async () => {
        if (editData === null) {
            await createIssue({title: titleText, description: descriptionText})
        }else{
            await updateIssue({id: editData?._id,title: titleText, description: descriptionText})
        }
        changeEditData(null)
        setTitleText('')
        setDescriptionText('')
        changeIsVisible(false) 
    }

    useEffect(() => {
        setTitleText(editData?.title ?? '')
        setDescriptionText(editData?.description ?? '')
    },[editData])

    return (
        <Modal open={isVisible} okText={"Submit"} onCancel={onCancel} onOk={onSubmit} destroyOnClose={true} confirmLoading={saveIsLoading || updateIsLoading}>
            <div className={styles.modalWrapper}>
                <div className={styles.title}>{editData === null ? 'Add Employee' : 'Edit Employee'}</div>
                <Input placeholder="Name" className={styles.inputTitle} value={titleText} onChange={(e) => setTitleText(e.target.value)}/>
                <Input prefix='AUD' type='number' placeholder="Salary" className={styles.inputTitle} value={titleText} onChange={(e) => setTitleText(e.target.value)} />
                <Input type='number' placeholder="Age" className={styles.inputTitle} value={titleText} onChange={(e) => setTitleText(e.target.value)}/>
            </div>
        </Modal>
    )
}

export default AddEditModal;