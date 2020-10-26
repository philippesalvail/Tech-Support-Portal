import React from "react";
import {Icon} from "react-icons-kit";
import {plus} from "react-icons-kit/fa/plus";
import {history} from "react-icons-kit/fa/history";
import {close} from "react-icons-kit/fa/close";
import {alignLeft} from "react-icons-kit/fa/alignLeft";
import {toList} from "react-icons-kit/entypo/toList";

export const NewTicketIcon = () => <Icon icon={plus} size={"32"} />;
export const HistoryIcon = () => <Icon icon={history} size={"32"} />;
export const PendingIcon = () => <Icon icon={toList} size={"32"} />;
export const ClosedIcon = () => <Icon icon={alignLeft} size={"32"} />;
