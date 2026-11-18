import { oveliqEnquiry } from "./content";

const enquiryServices = {
  website: oveliqEnquiry.services[0].title,
  product: oveliqEnquiry.services[1].title,
  automation: oveliqEnquiry.services[2].title,
  custom: oveliqEnquiry.services[3].title,
} as const;

export type EnquiryService = keyof typeof enquiryServices;

export function enquiryHref(service: EnquiryService) {
  return `/contact?service=${service}#project-brief`;
}

export function initialEnquiryService(search: string) {
  const service = new URLSearchParams(search).get("service");
  return service && Object.hasOwn(enquiryServices, service)
    ? enquiryServices[service as EnquiryService]
    : "";
}
