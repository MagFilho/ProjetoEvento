
export default function ConverterData(data){
    try{
        return (new Date(new Date(data).toISOString().slice(0, -1)))
    }catch(e){
        try{
            return new Date(data)
        }catch(e){
            return data
        } 
    }
}