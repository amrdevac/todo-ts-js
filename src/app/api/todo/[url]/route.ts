import axios, { AxiosError, AxiosResponse } from "axios";

const baseURL = process.env.BASE_URL ?? ""

interface payloadType {
    title: string;
    value: string;
    id?: number;
};

const setPayload = (payload: object, name: string): payloadType => {

    return {
        title: name,
        value: JSON.stringify(payload)
    }
}


export async function POST(request: Request) {
    let payload;
    let response: AxiosResponse<any, any>

    try {
        payload = await request.json()
    } catch (error) {
        payload = {}
    }

    const url = request.url.split("/")[5]
    try {

        if (url == "list") {
            let result_data = []
            let result_total = 0;
            const response: AxiosResponse<payloadType[]> = await axios.get(`${baseURL}?filter=todo`)
            if (response.data.length > 0) {
                result_data = JSON.parse(response.data[0].value)
                result_total = JSON.parse(response.data[0].value).length
            }
            return Response.json({
                response_status: true,
                response_message: "loaded successfully",
                response_data: {
                    total: result_total,
                    data: result_data
                }
            })

        }

        if (url == "add") {
            const timestamp = new Date().getTime();
            payload = { ...payload, id: timestamp };
            let fixedPayload = setPayload([payload], "todo");
            const getCurrentData: AxiosResponse<payloadType[]> = await axios.get(`${baseURL}?filter=todo`)
            if (getCurrentData.data.length > 0) {
                const objData = getCurrentData.data[0]
                const parseObjValue: payloadType[] = JSON.parse(objData.value)
                parseObjValue.push(payload)
                fixedPayload = setPayload(parseObjValue, "todo")
                response = await axios.put(`${baseURL}/${objData.id}`, fixedPayload)
                return Response.json(response.data)
            } else {
                response = await axios.post(baseURL, fixedPayload)
                return Response.json(response.data)
            }
        }

        throw "endpoint not registered"

    } catch (error) {
        let message, status
        const nativeError = (error as Error);
        message = nativeError.toString()
        status = 500

        if (axios.isAxiosError(error)) {
            const axiosError = (error as AxiosError);
            message = axiosError.toString()
            status = axiosError.response?.status
        }

        return Response.json({
            status: false,
            mesage: message,
            data: {}
        },
            {
                status: status
            })
    }
}