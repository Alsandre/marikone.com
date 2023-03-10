import React from "react";
import { LocationIcon, PhoneIcon } from "../icons";
import { Text } from "./Text";

export const StoreInfo = ({
  title,
  address,
  phone,
}: Record<string, string>) => {
  return (
    <>
      <div className="text-body flex flex-col items-start mb-8 w-fit mx-auto min-w-[250px]">
        <Text variant="label" className="mb-2">{title}</Text>

        <div className="flex flex-col pt-1">
          <div className="flex flex-row">
            <LocationIcon />
            <Text variant='body' className="pl-2">{address}</Text>
          </div>

          <div className="flex flex-row pt-2">
            {phone && <PhoneIcon />}
            <Text variant='body' className="pl-2">{phone}</Text>
          </div>
        </div>
      </div>
    </>
  );
};
