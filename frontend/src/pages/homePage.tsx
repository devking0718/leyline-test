import { Card, Typography } from "@material-tailwind/react";
import BannerImage from '../assets/img/banner.png';

export default function HomePage() {

    return (
        <div className="container mx-auto">
            <div className="mx-auto max-w-screen-md py-12">
                <Card className="mb-12 overflow-hidden">
                    <img
                        alt="nature"
                        className="h-[32rem] w-full object-cover object-center"
                        src={BannerImage}
                    />
                </Card>
                <Typography variant="h2" color="blue-gray" className="mb-2 text-center">
                    Times are changing.
                </Typography>
                <Typography color="gray" className="font-normal text-center">
                    LeyLine is a platform created by professionals, for professionals,
                    to better cope with the evolving creative landscape.
                </Typography>
            </div>
        </div>
    );
}