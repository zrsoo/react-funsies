export const areArraysTheSame = (a1: {id: string, content: string}[], a2: {id: string, content: string}[]) => {
    if(a1.length !== a2.length)
        return false;

    for(let i = 0; i < a1.length; ++i) {
        if(a1[i] !== a2[i])
            return false;
    }
        
    return true;
}