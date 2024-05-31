import { Button, Card, CardBody, Chip, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_URL } from "../config";
import { toast } from "react-toastify";
import { socket } from "../config/socket";

interface RequestTypeProps {
    id: number;
    requestAmount: number;
    responseAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

function PartBPage() {
    const [open, setOpen] = useState<boolean>(false);
    const [responseAmount, setResponseAmount] = useState<number>(0);
    const [request, setRequest] = useState<RequestTypeProps | null>(null);

    const handleOpen = () => setOpen(!open);

    const submitResponse = async () => {
        if (responseAmount === 0) {
            toast.error("Please Enter Request Amount.");
            return;
        }

        const body = {
            id: request?.id,
            requestAmount: responseAmount,
            status: "dispute"
        }

        await axios.post(`${SERVER_URL}/disputeRequest`, body)
            .then(function (response) {
                toast.success(response.data.message);

            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });

        setOpen(false)
    }

    const getRequest = async () => {
        await axios.get(`${SERVER_URL}/getResponse`)
            .then(function (response) {
                console.log("response", response.data.data)
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

        await axios.post(`${SERVER_URL}/agreeRequest`, body)
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
    }, []);   

    useEffect(() => {

        socket.on("message", (data:any) => {
           console.log("partB", JSON.parse(data));
           const updateStatus = JSON.parse(data);
            console.log("updateStatus", updateStatus)
           if(updateStatus.success === true) {
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
                <div className="sm:w-1/3 w-96 px-4">
                    <Card color="white" shadow={true} className="mb-5 border">
                        <CardBody className="">
                            <div className="flex w-full flex-col gap-0.5">
                                <div className="mb-5">
                                    <div className="flex items-center justify-between mb-5">
                                        <Typography variant="h5" color="blue-gray">
                                            PartA's Amount:
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
                                    <Button disabled={request?.status === "settled" && true} className="w-1/2 border-black border" onClick={handleOpen} color="white">Dispute</Button>
                                    <Button disabled={request?.status === "settled" && true} className="w-1/2" onClick={agreeRequest}>Agree</Button>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>Dispute</DialogHeader>
                <DialogBody>
                    <div className="w-full mb-5">
                        <Input label="Response Amount" color="gray" value={responseAmount} onChange={(e) => setResponseAmount(Number(e.target.value))} />
                    </div>
                    <div className="flex w-full flex-row gap-4">
                        <Button variant="outlined" className="w-1/2" color="gray" onClick={handleOpen}>
                            cancel
                        </Button>
                        <Button variant="gradient" className="w-1/2" color="gray" onClick={submitResponse}>
                            dispute
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    )
}

export default PartBPage
