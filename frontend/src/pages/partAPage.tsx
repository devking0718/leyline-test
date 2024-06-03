import { Card, CardBody, Typography, Input, Button, Chip, } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { DataTypeProps } from "../utils/interface";


export default function PartAPage() {
    const [requestAmount, setRequestAmount] = useState<number>(0);
    const [response, setResponse] = useState<DataTypeProps | null>(null);

    const sendRequest = async (requestAmount: number) => {
        const body = {
            requestAmount: requestAmount,
            status: "pending"
        };

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendRequest`, body)
            .then(function (response) {
                toast.success(response.data.message);
            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });


        setResponse((preResponse) => {
            return { ...preResponse, status: "pending" };
        });
    }

    const submitRequest = async () => {
        if (requestAmount === 0) {
            toast.error("Please Enter Request Amount.");
            return;
        }

        if (await getResponse()) {
            toast.warn("Response Updated");
        }
        else {
            await sendRequest(requestAmount);
        }
    }

    const isResponseUpdated = (preData: ResponseTypeProps | null, newData: ResponseTypeProps | null): boolean => {
        if (preData != null && newData != null) {
            if (newData.status == "pending") {
                return false;
            }
            return preData.status !== newData.status;
        }
        return preData != newData;
    };

    const getResponse = async (): Promise<boolean> => {
        let currentResponse = response;

        let res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getResponse`);
        let newResponse = res.data.data[0]

        setResponse(newResponse);
        if (isResponseUpdated(currentResponse, newResponse)) {
            return true;
        }
        return false;
    }

    const resetData = async () => {
        setRequestAmount(0)
        await sendRequest(0);
    }

    useEffect(() => {
        getResponse();
    }, []);

    return (
        <div className="container mx-auto py-12">
            <div className="flex flex-row justify-center w-full">
                <div className="sm:w-1/2 md:w-1/2 w-full  px-4">
                    <Typography variant="h3" color="blue-gray" className="text-center uppercase mb-5">Part A</Typography>
                    <Card color="white bg-black-900" shadow={true} className="mb-5 border w-full">
                        <CardBody className="">
                            {response && (
                                <div className="flex items-center justify-between mb-5">
                                    <Typography variant="h5" color="blue-gray">
                                        Response Status:
                                    </Typography>
                                    {response?.status === "pending" && <Chip value={response.status} className="rounded-full" color="cyan" />}
                                    {response?.status === "dispute" && <Chip value={response.status + " with \"" + response.requestAmount + "\""} className="rounded-full" color="red" />}
                                    {response?.status === "settled" && <Chip value={response.status + " with \"" + response.requestAmount + "\""} className="rounded-full" color="green" />}
                                </div>
                            )}
                            <div className="w-full mb-5">
                                <Input label="Request Amount" className="w-full" color="blue" value={requestAmount} onChange={(e) => setRequestAmount(Number(e.target.value))} />
                            </div>
                            <div className="flex w-full flex-row gap-4">
                                <Button variant={`${response?.status === "settled" ? 'outlined' : 'gradient'}`} disabled={response?.status === "settled"} className={`w-${response?.status === "settled" ? '1/2' : 'full'}`} color="gray" onClick={submitRequest}>
                                    Submit
                                </Button>
                                {response?.status === "settled" && (
                                    <Button variant="gradient" className={`w-${response?.status === "settled" ? '1/2' : 'full'}`} color="gray" onClick={resetData}>
                                        Reset
                                    </Button>
                                )}
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}