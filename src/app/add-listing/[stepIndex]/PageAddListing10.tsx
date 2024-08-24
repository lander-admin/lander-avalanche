import StayCard from "@/components/StayCard";
import React, { FC } from "react";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { EyeIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Route } from "@/routers/types";
import { PageAddListingProps } from "./StepsContainer";
import useCreateStay from "@/hooks/useCreateData";
import { useStay } from "@/contexts/StayProvider";

const PageAddListing10: FC<PageAddListingProps> = () => {
  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
        <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
          Excellent, congratulations on completing the listing, it is waiting to
          be reviewed for publication
        </span>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      {/* FORM */}
      <div>
        <h3 className="text-lg font-semibold">This is your listing</h3>
        <div className="max-w-xs">
          {/* TODO: Show linting with new data added */}
          {/* <StayCard
            className="mt-8"
            data={{ , reviewStart: 0 }}
          /> */}
        </div>
        {/* <div className="flex items-center space-x-5 mt-8">
          <ButtonSecondary href={"/add-listing/1" as Route}>
            <PencilSquareIcon className="h-5 w-5" />
            <span className="ml-3">Edit</span>
          </ButtonSecondary>

          <ButtonPrimary>
            <EyeIcon className="h-5 w-5" />
            <span className="ml-3">Preview</span>
          </ButtonPrimary>
        </div> */}
      </div>
      {/*  */}
    </>
  );
};

export default PageAddListing10;
