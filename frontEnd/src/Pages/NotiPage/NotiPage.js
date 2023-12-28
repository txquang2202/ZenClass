import React from "react";
import { Avatar } from "@material-ui/core";
import { useNotificationContext } from "../../context/NotificationContext";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

function NotiPage(props) {
  const { menuItemsData } = useNotificationContext();
  return (
    <>
      <section className="feature pt-[34px] pb-[170px]">
        <div className="container w-max lg:max-w-[calc(100%-50rem)] mx-auto rounded-lg p-6 shadow-[0_4px_9px_-4px_#3b71ca]  ">
          <div className="flex justify-start">
            <h2 className="section-heading font-semibold text-3xl leading-[1.2] tracking-tight text-[#10375c]">
              Notifications
            </h2>
          </div>
          <hr className="text-gray-200 h-1 mt-6" />
          <div className="flex flex-col mt-[20px] space-y-1">
            {menuItemsData.map((item) => (
              <div
                key={item.id}
                className="flex rounded-lg justify-between items-center  p-4 cursor-pointer hover:bg-gray-100"
              >
                <div className="flex">
                  <Avatar
                    alt={item.fullname}
                    src={item.avatarSrc}
                    className=" mt-1 h-12 w-12"
                  />
                  <div className="ml-3">
                    <span className="font-semibold">{item.fullname} </span>
                    <p
                      className="text-base inline"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {item.content}
                    </p>
                    <span className="text-[#10375c] font-bold text-sm block mt-2">
                      {item.date}
                    </span>
                  </div>
                </div>
                <span className="">
                  <RemoveCircleOutlineIcon
                    // onClick={() => handleDeleteComment(comment.id)}
                    className="text-gray-300 cursor-pointer hover:text-blue-400"
                  />
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default NotiPage;
