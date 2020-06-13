import { message } from 'antd'


export const successMessage = () => {
    message.success("Data Updated Successfully!")
}

export const errorMessage = () => {
    message.error("Error occured! Please try again.")
}

