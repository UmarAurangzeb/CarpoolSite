import { z } from "zod"

export const schema = z.object({
    CarName: z.string().min(3, { message: "CarName is required" }).max(20),
    OwnerName: z.string().min(3, { message: "OwnerName is required" }),
    MonthlyCharges: z.coerce.number().min(1, { message: "MonthlyCharges are required" }).max(7000, { message: "MonthlyCharges cannot exceed 7000" }).optional().or(z.literal('')),
    CompleteRoute: z.string().min(5, { message: "CompleteRoute is required" }).max(120, "route limit exceeded"),
    Whatsapp: z.string().length(11, { message: "please enter a valid number" }),
    AccessType: z.enum(['Daily', 'Semester']),
    BriefDescription: z.string().min(5, { message: "Please enter a brief description" }).max(20).optional().or(z.literal('')),
})