import { Button, Card, CardBody, Chip, Typography } from "@material-tailwind/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { socket } from "../config/socket";
import { DataTypeProps } from "../utils/interface";


function PartBPage() {
    const [request, setRequest] = useState<DataTypeProps | null>(null);

    const submitResponse = async () => {

        const body = {
            id: request?.id,
            status: "dispute"
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/disputeRequest`, body)
            .then(function (response) {
                toast.success(response.data.message);

            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });

    }

    const getRequest = async () => {
        await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getResponse`)
            .then(function (response) {
                setRequest(response.data.data[0])
            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });
    }

    const agreeRequest = async () => {
        const body = {
            id: request?.id,
            responseAmount: request?.requestAmount,
            status: "settled"
        }

        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/agreeRequest`, body)
            .then(function (response) {
                toast.success(response.data.message);
                getRequest();
            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });
    }

    useEffect(() => {
        getRequest();

        socket.on("message", (data: any) => {
            const updateStatus = JSON.parse(data);
            if (updateStatus.success === true) {
                getRequest();
            }
        });

        return () => {
            socket.off("message");
        }
    }, []);

    return (
        <div className="container mx-auto py-12">
            <div className="flex flex-row justify-center w-full">
                <div className="sm:w-1/2 md:w-1/2 w-full  px-4">
                    <Typography variant="h3" color="blue-gray" className="text-center uppercase mb-5">Part B</Typography>
                    <Card color="white" shadow={true} className="mb-5 border">
                        <CardBody className="">
                            <div className="flex w-full flex-col gap-0.5">
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-5">
                                        <Typography variant="h5" color="blue-gray">
                                            Request Amount:
                                        </Typography>
                                        <Typography color="blue-gray">{request?.requestAmount}</Typography>
                                    </div>
                                    {
                                        request?.status === "settled" && (
                                            <div className="flex items-center justify-between">
                                                <Typography variant="h5" color="blue-gray">
                                                    Status:
                                                </Typography>
                                                <Chip value={request.status} className="rounded-full" color="green" />
                                            </div>
                                        )
                                    }
                                </div>
                                <div className="flex w-full flex-row gap-4">
                                    <Button disabled={request?.status === "settled" && true} className="w-1/2 border-black border" onClick={submitResponse} color="white">Dispute</Button>
                                    <Button disabled={request?.status === "settled" && true} className="w-1/2" onClick={agreeRequest}>Agree</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default PartBPage
