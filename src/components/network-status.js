import React from "react";
import t from "prop-types";
import clsx from "clsx";
import styled from "styled-components/macro";
import { Badge } from "antd";
import { drizzleReactHooks } from "@drizzle/react-plugin";
import useChainId from "../hooks/use-chain-id";

const { useDrizzleState, useDrizzle } = drizzleReactHooks;

const networkIdToNetworkName = {
  1: "Mainnet",
  3: "Ropsten",
  42: "Kovan",
  77: "Sokol",
  100: "xDAI",
};

const networkStatusToBadgeStatus = {
  initialized: "success",
  initializing: "warning",
  failed: "danger",
};

const StyledBadge = styled(Badge)`
  white-space: nowrap;

  &.initialized {
    color: #52c41a;
  }

  &.initializing {
    color: #faad14;
  }

  &.failed {
    color: #f5222d;
  }

  .ant-badge-status-dot {
    width: 8px;
    height: 8px;
  }

  .ant-badge-status-text {
    color: #fff;
  }
`;

const NetworkStatus = ({ className }) => {
  const { status } = useDrizzleState((drizzleState) => ({
    status: drizzleState.web3.status,
  }));
  const { drizzle } = useDrizzle();
  const chainId = useChainId(drizzle.web3);

  return (
    <StyledBadge
      className={clsx(status, className)}
      status={networkStatusToBadgeStatus[status]}
      text={networkIdToNetworkName[chainId]}
    />
  );
};

NetworkStatus.propTypes = {
  className: t.string,
};

export default NetworkStatus;
