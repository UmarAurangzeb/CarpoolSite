import prisma from "@/app/lib/db";

export async function DELETE(request: Request) {
    try {
        const owner = await request.json();
        console.log(owner);
        const deleteUser = await prisma.carowner.delete({
            where: {
                id: owner.id,
            },
        })
        if (deleteUser) {
            return Response.json({ message: "car deleted successfully", success: true }, { status: 200 });
        }
        else {
            return Response.json({ message: "failed to delete user", success: false }, { status: 400 });
        }

    }
    catch (error) {
        return Response.json({ message: "error deleting user", success: false }, { status: 500 });
    }
}

