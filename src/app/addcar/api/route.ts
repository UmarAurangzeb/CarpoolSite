import prisma from '../../lib/db';

type CarData = {
    OwnerEmail: string
    OwnerName: string;
    CarName: string;
    AccessType: string;
    BriefDescription?: string;
    MonthlyCharges: number;
    CompleteRoute: string;
    Whatsapp: string

};

export async function POST(req: Request) {
    try {
        const { ownerData, email } = await req.json();

        if (ownerData.AccessType === 'Semester') {
            ownerData.MonthlyCharges = Number(ownerData.MonthlyCharges);
            console.log("ownerdata:", ownerData);
            const newCar = await prisma.carowner.create({
                data: {
                    OwnerEmail: email,
                    OwnerName: ownerData.OwnerName,
                    carname: ownerData.CarName,
                    AccessType: ownerData.AccessType,
                    monthlycharges: ownerData.MonthlyCharges,
                    completeRoute: ownerData.CompleteRoute,
                    WhatsApp: ownerData.Whatsapp

                },
            });
            if (!newCar) {
                return Response.json({ message: "error adding car" }, { status: 400 });
            }
            return Response.json(newCar, { status: 200 })
        }

        const newCar = await prisma.carowner.create({
            data: {
                OwnerEmail: email,
                OwnerName: ownerData.OwnerName,
                carname: ownerData.CarName,
                AccessType: ownerData.AccessType,
                BriefDescription: ownerData.BriefDescription,
                completeRoute: ownerData.CompleteRoute,
                WhatsApp: ownerData.Whatsapp

            },
        });
        if (!newCar) {
            return Response.json({ message: "error adding car" }, { status: 400 });
        }
        return Response.json(newCar, { status: 200 })

    }
    catch (e) {
        console.log("error posting data ", e);
        return Response.json({ message: 'error posting data' }, { status: 500 });
    }

}