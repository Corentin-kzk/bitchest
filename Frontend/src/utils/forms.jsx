import BuyForm from '@components/molecule/Form/BuyForm'
import DeleteForm from '@components/molecule/Form/DeleteForm'
import UserForm from '@components/molecule/Form/UserForm'
import UserMeForm from '@components/molecule/Form/UserMeForm'
import SellForm from '@components/molecule/Form/sellForm'

//This file references forms from the dialog component
const DialogForm = {
  buyForm: <BuyForm />,
  sellForm: <SellForm />,
  userForm: <UserForm />,
  deleteForm: <DeleteForm />,
  userMeForm: <UserMeForm />,
}

export default DialogForm
