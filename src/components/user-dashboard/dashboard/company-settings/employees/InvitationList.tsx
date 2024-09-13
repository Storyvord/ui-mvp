import { Button } from "@/components/ui/button";
import React from "react";

type Invitation = {
  id: number;
  employee_email: string;
  referral_code: string;
  status: string;
  client_profile: { firstName: string };
};
type Props = {
  getInvitationsList: Invitation[];
  acceptInvitation: (value: string) => void;
  rejectInvitation: (value: string) => void;
};
const InvitationList = ({ getInvitationsList, acceptInvitation, rejectInvitation }: Props) => {
  return (
    <div className=" mt-8">
      <h1 className=" text-xl text-gray-700">Invitation List</h1>
      <hr />
      <>
        {getInvitationsList?.map((invitation) => {
          if (invitation.status === "pending") {
            return (
              <div
                key={invitation.id}
                className=" flex flex-col gap-4 mt-2 p-2 bg-white rounded-md shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                <p>
                  <b> {invitation?.client_profile.firstName}</b> invite you
                </p>
                <span className=" flex gap-3">
                  <Button size="sm" onClick={() => acceptInvitation(invitation.referral_code)}>
                    Accept
                  </Button>
                  <Button
                    onClick={() => rejectInvitation(invitation.referral_code)}
                    size="sm"
                    className=" bg-red-600 hover:bg-red-500"
                  >
                    Reject
                  </Button>
                </span>
              </div>
            );
          }
        })}
      </>
      {getInvitationsList?.length === 0 && (
        <h2 className=" text-center mt-4 text-gray-600">No invitation found</h2>
      )}
    </div>
  );
};

export default InvitationList;
