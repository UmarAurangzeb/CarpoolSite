import prisma from '../../lib/db';

type CarData = {
    nuID: string;
    OwnerName: string;
    CarName: string;
    MonthlyCharges: number;
    CompleteRoute: string;
    Whatsapp: string
};

export async function POST(req: Request) {
    try {
        const ownerData = await req.json();

        const not_unique_id = await prisma.carowner.findUnique({
            where: {
                nuid: ownerData.nuID
            }
        })
        console.log(not_unique_id);
        if (not_unique_id) {
            console.log("please enter a unique id");
            return Response.json({ error: "id already exists" }, { status: 501 });
        }


        ownerData.MonthlyCharges = Number(ownerData.MonthlyCharges);
        console.log("ownerdata:", ownerData);
        const newCar = await prisma.carowner.create({
            data: {
                nuid: ownerData.nuID,
                OwnerName: ownerData.OwnerName,
                carname: ownerData.CarName,
                monthlycharges: ownerData.MonthlyCharges,
                completeRoute: ownerData.CompleteRoute,
                WhatsApp: ownerData.Whatsapp

            },
        });
        return Response.json(newCar, { status: 200 })
    }
    catch (e) {
        console.log("error posting data ", e);
        return Response.json({ error: 'Error posting data' }, { status: 500 });
    }

}