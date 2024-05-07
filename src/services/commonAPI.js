import axios from "axios"

export const commonAPI=async(httpRequest,url,reqBody,reqHeader)=>{
    const reqConfig={
        method:httpRequest,
        url:url,
        data:reqBody,
        headers:reqHeader?reqHeader:{'Content-Type':"application/json"}
        // if there is uploaded content it should be mutliparts/homedata
        // where if there is no it sholud be application/json
        // since we have two type of data - request with uploaded contentb and request without uploaded content

    }

    return await axios(reqConfig).then((result)=>{
        return result
    }).catch((err)=>{
        return err
    })
}