export type Owner = {
    AccessType: string;
    BriefDescription?: string | null;
    OwnerEmail: string;
    monthlycharges?: number | null;
    completeRoute: string;
    WhatsApp: string;
    createdAt: Date;
}

export type allOwners = Owner[];