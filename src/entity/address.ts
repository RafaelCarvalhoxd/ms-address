export class Address {
    constructor(
      private readonly id: string | null,
      private readonly userId: string,
      private readonly zip: string,
      private readonly streetAddress: string,
      private readonly number: number,
      private readonly neighborhood: string,
      private readonly city: string,
      private readonly state: string,
      private readonly additionalInformation?: string,
      private readonly reference?: string
    ) {}
  
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
      return this.streetAddress;
    }
  
    getNumber(): number {
      return this.number;
    }
  
    getAdditionalInformation(): string | undefined {
      return this.additionalInformation;
    }
  
    getReference(): string | undefined {
      return this.reference;
    }
  
    getNeighborhood(): string | undefined {
      return this.neighborhood;
    }
  
    getCity(): string | undefined {
      return this.city;
    }
  
    getState(): string | undefined {
      return this.state;
    }
  }
  