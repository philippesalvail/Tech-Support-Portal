import React from "react";
import {Icon} from "react-icons-kit";
import {plus} from "react-icons-kit/fa/plus";
import {history} from "react-icons-kit/fa/history";
import {close} from "react-icons-kit/fa/close";
import {alignLeft} from "react-icons-kit/fa/alignLeft";
import {toList} from "react-icons-kit/entypo/toList";
import {user} from "react-icons-kit/ikons/user";
import {user_add} from "react-icons-kit/ikons/user_add";
import {user_circle} from "react-icons-kit/ikons/user_circle";
import {users} from "react-icons-kit/ikons/users";
import {user_ok} from "react-icons-kit/ikons/user_ok";
import {group} from "react-icons-kit/fa/group";
import {androidSearch} from "react-icons-kit/ionicons/androidSearch";
import {ic_create_new_folder} from "react-icons-kit/md/ic_create_new_folder";
import {ic_verified_user} from "react-icons-kit/md/ic_verified_user";

export const NewTicketIcon = () => <Icon icon={plus} size={"28"} />;
export const HistoryIcon = () => <Icon icon={history} size={"28"} />;
export const PendingIcon = () => <Icon icon={toList} size={"28"} />;
export const ClosedIcon = () => <Icon icon={alignLeft} size={"28"} />;
export const AllSupportersIcon = () => <Icon icon={users} size={"28"} />;
export const WaitingSupportersIcon = () => <Icon icon={user_ok} size={"28"} />;
export const TeamSupportersIcon = () => <Icon icon={user_circle} size={"28"} />;
export const SearchIcon = () => <Icon icon={androidSearch} size={"16"} />;
export const DisplayNewTicketIcon = () => (
  <Icon icon={ic_create_new_folder} size={"28"} />
);

export const TeamIcon = () => <Icon icon={group} size={"28"} />;
export const VerifiedUserIcon = () => (
  <Icon icon={ic_verified_user} size={"28"} />
);
