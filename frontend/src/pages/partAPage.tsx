import { Card, CardBody, Typography, Input, Button, Chip, Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SERVER_URL } from "../config";
import { socket } from "../config/socket";

interface ResponseTypeProps {
    id: number;
    requestAmount: number;
    responseAmount: number;
    status: string;
    createdAt: string;
    updatedAt: string;
}

export default function PartAPage() {
    const [requestAmount, setRequestAmount] = useState<number>(0);
    const [response, setResponse] = useState<ResponseTypeProps | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [update, setUpdate] = useState<boolean>(false);



    const handleOpen = () => setOpen(!open);

    const submitRequest = async () => {
        if (requestAmount === 0) {
            toast.error("Please Enter Request Amount.");
            return;
        }

        getResponse();

        if(!update) {
          toast.warn("You get new update status from Part B");
          setUpdate(true)
          return
        }
        

        const body = {
            requestAmount: requestAmount,
            status: "pending"
        }

        socket.emit("message", JSON.stringify(body));

    }

    const checkUpdate = (preData: ResponseTypeProps, newData: ResponseTypeProps): boolean => {
        return (
            preData.requestAmount === newData.requestAmount &&
            preData.responseAmount === newData.responseAmount &&
            preData.status === newData.status

        )
    }

    const getResponse = async () => {
        await axios.get(`${SERVER_URL}/getResponse`)
            .then(function (response) {
                console.log("response", response.data.data[0])
                const newResponse = response.data.data[0];

                setResponse(preResponse => {
                    
                    if(preResponse) {
                        const updateStatus = checkUpdate(preResponse!, newResponse);
                        setUpdate(updateStatus);
                        return newResponse;
                    }                    
                    else {
                        setUpdate(true)
                        return newResponse;
                    }

                });
            })
            .catch(function (error) {
                toast.error(error.response.data.message);
            });
    }

    useEffect(() => {
        getResponse();
    }, []);

    useEffect(() => {
        socket.on("message", (data:any) => {
           const updateStatus = JSON.parse(data);
           if(updateStatus.success === true) {
            toast.success(updateStatus.message);
           }
           else {
            toast.error(updateStatus.message);
           }
        });

        return () => {
            socket.off("message");
        }
    })

    

    return (
        <div className="container mx-auto py-12">
            <div className="flex flex-row justify-center w-full">
                <div className="sm:w-1/3 w-96 px-4">
                <Card color="white" shadow={true} className="mb-5 border">
                        <CardBody className="">
                            <div className="w-full mb-5">
                                <Button variant="outlined" className="w-full" color="gray" onClick={getResponse}>
                                    GetStaus
                                </Button>
                            </div>
                            {response !== null && (
                                <div className="flex w-full flex-col gap-0.5">
                                    <div className="mb-5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                Request Amount:
                                            </Typography>
                                            <Typography color="blue-gray">{response.requestAmount}</Typography>
                                        </div>
                                    </div>
                                    <div className="mb-5">
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                PartB's Amount:
                                            </Typography>
                                            <Typography color="blue-gray">{response.responseAmount}</Typography>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-between">
                                            <Typography variant="h5" color="blue-gray">
                                                Request Status:
                                            </Typography>
                                            {response.status === "pending" && <Chip value={response.status} className="rounded-full" color="cyan" />}
                                            {response.status === "dispute" && <Chip value={response.status} className="rounded-full" color="red" />}
                                            {response.status === "settled" && <Chip value={response.status} className="rounded-full" color="green" />}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </CardBody>
                    </Card>
                    <Card color="white" shadow={true} className="mb-5 border">
                        <CardBody className="">
                            <Typography className="mb-5 font-bold uppercase text-2xl text-center">Send Request</Typography>
                            <div className="w-full mb-5">
                                <Input label="Request Amount" color="blue" value={requestAmount} onChange={(e) => setRequestAmount(Number(e.target.value))} />
                            </div>
                            <div className="w-full">
                                <Button variant="gradient" className="w-full" color="gray" onClick={submitRequest}>
                                    Submit
                                </Button>
                            </div>
                        </CardBody>
                    </Card>                    
                </div>
            </div>
            <Dialog open={open} handler={handleOpen} size="xs">
                <DialogHeader>Dispute</DialogHeader>
                <DialogBody>                    
                    <div className="flex w-full flex-row gap-4">
                        <Button variant="outlined" className="w-1/2" color="gray" onClick={handleOpen}>
                            cancel
                        </Button>
                        <Button variant="gradient" className="w-1/2" color="gray" >
                            dispute
                        </Button>
                    </div>
                </DialogBody>
            </Dialog>
        </div>
    );
}