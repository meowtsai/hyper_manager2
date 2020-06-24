// @flow
import React from "react";
import {
  Card,
  CardBody,
  UncontrolledButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { vipRankingOptions } from "../whale_users/whaleOptConfig";

const TopBuyers = ({ data = [], refreshData, title }) => {
  return (
    <Card>
      <CardBody>
        <UncontrolledButtonDropdown className="float-right">
          <DropdownToggle
            tag="button"
            className="btn btn-link arrow-none card-drop p-0"
          >
            <i className="mdi mdi-dots-vertical"></i>
          </DropdownToggle>

          <DropdownMenu right>
            <DropdownItem
              onClick={() => {
                refreshData({ function: "buyrs", value: 1 });
              }}
            >
              過去 1 日
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                refreshData({ function: "buyrs", value: 7 });
              }}
            >
              過去 7 日
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                refreshData({ function: "buyrs", value: 30 });
              }}
            >
              過去 30 日
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledButtonDropdown>

        <h4 className="header-title mb-4">Top 10 買家排行榜 ({title})</h4>

        {data.map((row) => (
          <div key={`buyer_${row.role_id}`} className="media mt-2">
            <div className="media-body">
              <h5 className="mt-0 mb-1">
                <Link
                  to={`/vip/user_dashboard/${row.game_id}?user=${row.role_id}`}
                >
                  {" "}
                  {row.char_name}
                </Link>

                {vipBadge(row.vip_ranking)}
              </h5>
              <span className="font-13">
                {row.game_name}/{row.role_id}
              </span>

              <p className="mb-1">
                <span className="pr-2 text-nowrap mb-2 d-inline-block">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "TWD",
                    minimumFractionDigits: 0,
                  }).format(row.total)}
                </span>
                <span className="text-nowrap mb-2 d-inline-block">
                  <i className="mdi mdi-file-table-outline text-muted mr-1"></i>
                  <b>{row.cnt}</b> 訂單數
                </span>
              </p>
            </div>
          </div>
        ))}
      </CardBody>
    </Card>
  );
};

export default TopBuyers;

const vipBadge = (vip_ranking) => {
  const opt = vipRankingOptions.filter((opt) => opt.value === vip_ranking)[0];

  return opt ? (
    <span
      className={`mr-1 badge badge-${opt.color}-lighten badge-pill float-right`}
    >
      {opt.label || ""}
    </span>
  ) : (
    ""
  );
};
