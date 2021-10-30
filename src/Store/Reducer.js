const initialState = {
    showModal: false,
    Details: [],
    TempRecord: {},
    message:''
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_SHOW_MODAL') {
        return {
            ...state,
            showModal: action.payload
        }
    }
    if (action.type === 'ON_PRESS_ADD_OR_EDIT') {
        let user = action.payload.record;
        let index= action.payload.index;
        let tempRecord = { ...user };
        tempRecord['index'] = index;

        return {
            ...state,
            TempRecord: tempRecord,
            showModal:true,
            message:''
        }
    }
    if (action.type === 'DELETE_RECORD') {
        let userRecords = [...state.Details];
        if (window.confirm('Are you sure?')) {
            
            userRecords.splice(action.payload, 1);
        }
        return {
            ...state,
            Details: userRecords
        }
    }
    if (action.type === 'ON_CONFIRM') {
        //change state and close sidebar
        let TempRecord = {
            name: state.TempRecord.name,
            email: state.TempRecord.email,
            address: state.TempRecord.address,
            phone: state.TempRecord.phone,
            website: state.TempRecord.website
        };
        let valid=true;
        let message=''

        let name_valid=TempRecord.name && TempRecord.name!=='';
        if(!name_valid) message+='Enter name, ';

        let regex_email=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let email_valid=TempRecord.email && regex_email.test(TempRecord.email);
        if(!email_valid) message+='Enter valid email, ';

        let address_valid=TempRecord.address && TempRecord.address!=='';
        if(!address_valid) message+='Enter address, ';

        let regex_phone=/^[+-]{0,1}[0-9]{10}$/;
        let phone_valid=TempRecord.phone && regex_phone.test(TempRecord.phone);
        if(!phone_valid) message+='Enter valid phone number, ';

        let regex_website=/^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;
        let website_valid=TempRecord.website && regex_website.test(TempRecord.website);
        if(!website_valid) message+='Enter valid website, ';
        valid= valid && name_valid && email_valid && address_valid && phone_valid && website_valid;
        
        //validate
        if (valid) {
            let index = state.TempRecord.index;
            let userRecords = [...state.Details];

            if (index === -1) {
                //Add
                userRecords.push(TempRecord);
            }
            else {

                //Edit
                userRecords[index] = TempRecord;
            }
            return {
                ...state,
                Details: userRecords,
                showModal: false
            }

        }
        else
            return{
                ...state,
                message:message
            }
    }

    if (action.type === 'HANDLE_SIDEBAR_CHANGE') {
        let event=action.payload;
        let tempRecord = { ...state.TempRecord };
        tempRecord[event.target.name] = event.target.value;
        return{
            ...state,
            TempRecord: tempRecord

        }
    }


    return state;
};

export default reducer;