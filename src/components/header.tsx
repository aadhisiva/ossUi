import React from "react";
import { Col, Image, Row } from "react-bootstrap";

export default function Header({ userRole }: {userRole: string}) {
  return (
    <div className="bg-slate-500 sticky z-1 top-0 border-b-1">
      <Row className="h-12 flex flex-row w-full items-center">
        <Col md={2} xs={4} className="text-left">
          <Image
            className="ml-3"
            width={50}
            height={50}
            src={require("../assests/Images/karnataka.png")}
          />
        </Col>
        <Col md={9} xs={6} className="font-bold text-white text-center text-sm">
          Government of Karnataka MANASA
        </Col>
        <Col md={1} xs={2} className="justify-end">
          <span className="text-sm text-white">
            {userRole}
          </span>
        </Col>
      </Row>
    </div>
  );
}
