


interface allPasswordRequirements {
    text: string,
    status: boolean

}


export const checkPasswordStrength = (targetValue: string, updateAllPasswordRequirements: React.Dispatch<React.SetStateAction<allPasswordRequirements[]>>) =>{
    // Check if password char >= 6
    if (targetValue.length >= 6) {

        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "6 characters minimum" ? { ...requirement, status: true } : requirement));
        });
    }
    if (targetValue.length < 6) {
  
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "6 characters minimum" ? { ...requirement, status: false } : requirement));
        });
    }

    // Check if password contains at least one number
    if (/\d/.test(targetValue)) {
       
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "one number" ? { ...requirement, status: true } : requirement));
        });
    }
    if (!/\d/.test(targetValue)) {
      
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "one number" ? { ...requirement, status: false } : requirement));
        });
    }

    // Check if password contains at least one special character
    if (/[^A-Za-z0-9]/.test(targetValue)) {
     
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "one special character" ? { ...requirement, status: true } : requirement));
        });
    }
    if (!/[^A-Za-z0-9]/.test(targetValue)) {
 
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "one special character" ? { ...requirement, status: false } : requirement));
        });
    }

    // Check if password contains at least one uppercase letter
    if (/[A-Z]/.test(targetValue)) {
  
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "One uppercase" ? { ...requirement, status: true } : requirement));
        });
    }
    if (!/[A-Z]/.test(targetValue)) {

        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "One uppercase" ? { ...requirement, status: false } : requirement));
        });
    }

    // Check if password contains at least one lowercase letter
    if (/[a-z]/.test(targetValue)) {
       
        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "one lower case" ? { ...requirement, status: true } : requirement));
        });
    }
    if (!/[a-z]/.test(targetValue)) {

        updateAllPasswordRequirements((prevRequirements) => {
            return prevRequirements.map((requirement) => (requirement.text === "one lower case" ? { ...requirement, status: false } : requirement));
        });
    }

}
