import React from "react";

const UserDetails = ({ user: { name, phone, email, company } }) => {
  return (
    <div>
      <div>
        User Details
        {name ? (
          <div>
            Name: {name}
            <br />
            Phone: {phone}
            <br />
            email: {email}
            <br />
            company name: {company.name}
          </div>
        ) : (
          <div>No user selected</div>
        )}
      </div>
    </div>
  );
};

export default UserDetails;
