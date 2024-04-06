import React, { useState } from "react";
import Titlebar from "../../../components/common/titlebar";
import { AvatarDropdown } from "../../../components/common/menuDropDown";
import {
  Button,
  Col,
  Form,
  InputGroup,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import SelectInput from "../../../components/common/selectInput";
import "./urbanStyle.css";
import { IsAuthenticated } from "../../../Authentication/useAuth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomPagination from "../../../components/common/customPagination";
import DivisionModal from "../../../components/common/Modals/divisionModal";
import TableRowsPerPageDropDown from "../../../components/common/tableRowsPerPage";
import { SearchBox } from "../../../components/common/searchBox";

export default function DivisionComponent() {
  const [zone, setZone] = useState("");

  const [originalData, setOriginalData] = useState<any>([]);
  const [copyOfOriginalData, setCopyOriginalData] = useState<any>([]);

  const [searchTerm, setSearchTerm] = useState(""); // for search to get any value

  const [isLoading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [editForm, setEditForm] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [formData, setFormData] = useState({});

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const totalPages = Math.ceil(copyOfOriginalData.length / itemsPerPage);

  const [{ Role, Mobile, loginCode }] = IsAuthenticated();

  const navigate = useNavigate();
  const { currentPath } = useSelector((state: any) => state.path);

  const handleChangeRoutes = () => {
    navigate(`/Taluk/${currentPath}`);
  };

  const onPageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = copyOfOriginalData.slice(startIndex, endIndex);

  const handleZoneSelect = () => {};
  const handleClearFilters = () => {
    setZone("");
  };

  const handleCLickModify = async (obj: any, title: string) => {
    setFormData(obj);
    setEditForm(true);
    setModalTitle(title);
  };

  const rednerForm = () => {
    return (
      <DivisionModal
        show={editForm}
        title={modalTitle}
        saveType={"DO"}
        formData={formData}
        // handleSubmitForm={handleAssignToRespectveiRoles}
        // handleModifyAssignedUser={handleAssignToRespectveiRoles}
        onHide={() => setEditForm(false)}
      />
    );
  };

    // const filteredData = (currentItems || []).filter((item: any) => {
    //   return (
    //     item?.Division?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item?.UnAssigned?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item?.Scheduled?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item?.Completed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item?.TotalCount?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //     item?.CreatedMobile?.toLowerCase().includes(searchTerm.toLowerCase())
    //   );
    // });

  return (
    <React.Fragment>
      {editForm && rednerForm()}
      <Titlebar
        title="Division AssignMent"
        Component={
          <AvatarDropdown
            dropDown={[{ routeName: "DashBoard", routePath: "/Dashboard" }]}
            username={"Super Admin"}
          />
        }
      />
      <div>
        <Row className="boxTitle">
          <Col md={2} className="boxText">
            FIlters
          </Col>
        </Row>
        <Row className="box">
          <Col md={3} sm={6}>
            <SelectInput
              defaultSelect="Select Zone"
              options={[]}
              onChange={handleZoneSelect}
              value={zone}
            />
          </Col>
          <Col md={3}>
            <InputGroup className="mb-3">
              <Button variant="outline-secondary" id="button-addon1">
                <i className="bi bi-search"></i>
              </Button>
              <Form.Control
                aria-label="Example text with button addon"
                aria-describedby="basic-addon1"
                placeholder="Search by any"
              />
            </InputGroup>
          </Col>
          <Col md={3} sm={6}>
            <Button onClick={() => handleCLickModify({}, "Add")}>
              Add User
            </Button>
          </Col>
          <Col md={3} sm={6}>
            <Button onClick={handleClearFilters}>Clear Filters</Button>
          </Col>
        </Row>
        <Row className="searchWithDroopDown">
          <Col md={2}>
            <TableRowsPerPageDropDown
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          </Col>
          <Col md={4} clas>
            <SearchBox searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </Col>
        </Row>
        <Row className="m-4">
          <Table hover className="bg-green-200 pn-2" size="sm">
            <thead className="urbanThead">
              <th className="urbanTh p-1">Name</th>
              <th className="urbanTh p-1">Mobile Number</th>
              <th className="urbanTh p-1">District</th>
              <th className="urbanTh p-1">Zone</th>
              <th className="urbanTh p-1">Division</th>
              <th className="urbanTh p-1">Action</th>
            </thead>
            <tbody>
              <tr className="spacer"></tr>
              <tr>
                <td className="tableRowStart">JHi</td>
                <td>JHi Name</td>
                <td>{"District"}</td>
                <td>Zone</td>
                <td>Division</td>
                <td>JHi Ward</td>
                <td className="tableRowEnd">
                  <td>
                    <Button
                      className="mr-1"
                      variant="primary"
                      onClick={() => handleCLickModify("obj", "Modify")}
                    >
                      Modify
                    </Button>
                  </td>
                </td>
              </tr>
              <tr className="spacer"></tr>
            </tbody>
          </Table>
          <CustomPagination
            currentCount={currentItems.length || 0}
            onPageChange={onPageChange}
            totalCount={copyOfOriginalData.length || 0}
            totalPages={totalPages}
          />
        </Row>
      </div>
    </React.Fragment>
  );
}
