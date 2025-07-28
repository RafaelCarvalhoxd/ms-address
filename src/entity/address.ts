export class Address{
    constructor(
        private readonly id: string,
        private readonly userId: string,
        private readonly zip: string,
        private readonly street_address: string,
        private readonly address_number: number,
        private readonly neighborhood: string,
        private readonly city: string,
        private readonly state: string,
        private readonly additional_information?: string,
        private readonly reference?: string,
    ){}

     getId(): string {
        return this.id;
    }

    getUserId(): string {
        return this.userId;
    }

    getZip(): string {
        return this.zip;
    }
    getStreetAddress(): string {
        return this.street_address;
    }

    getAddressNumber(): number {
        return this.address_number;
    }

    getNeighborhood(): string {
        return this.neighborhood;
    }

    getCity(): string {
        return this.city;
    }

    getState(): string {
        return this.state;
    }

    getAdditionalInformation(): string | undefined {
        return this.additional_information;
    }

    getReference(): string | undefined {
        return this.reference;
    }
}