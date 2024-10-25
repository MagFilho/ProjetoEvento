import { useEffect, useState } from "react";
import { Col, Input, Label, Pagination, PaginationItem, PaginationLink, Row } from "reactstrap";

export default function Paginacao({ offset, totalPages, pageSize, setOffeset, buscar, totalElements, children, setTotalPages }) {

    const [pages, setPages] = useState([]);
    const [offesetAnterioir, setOffesetAnterioir] = useState(-1);

    useEffect(() => {

        let pagesNovas = []
        if (totalPages > 7 && offset + 5 <= totalPages) {
            for (let i = (offset > 2 ? offset - 3 : 0); i < (offset > 2 ? offset + 5 : 7); i++) {
                pagesNovas.push({
                    text: i + 1,
                    offset: i,
                    active: i === offset
                })
            }
            setPages(pagesNovas);
        } else if (totalPages < 7) {
            for (let i = 0; i < totalPages; i++) {
                pagesNovas.push({
                    text: i + 1,
                    offset: i,
                    active: i === offset
                })
            }
            setPages(pagesNovas);
        } else if (totalPages => 7 && offset + 5 > totalPages) {
            for (let i = totalPages - 7; i < totalPages; i++) {
                pagesNovas.push({
                    text: i + 1,
                    offset: i,
                    active: i === offset
                })
            }
            setPages(pagesNovas);
        } else {

            if (offesetAnterioir > -1) {
                document.getElementById("page-" + offesetAnterioir).className = ""
            }

            let pageActive = document.getElementById("page-" + offset);

            if (pageActive != null) {
                pageActive.className = "page-item active"
            }

            setOffesetAnterioir(offset);

        }

    }, [offset, totalPages])

    const onNext = () => {
        setOffeset((offset + 1) == totalPages ? offset : offset + 1);
    }
    const onNextFull = () => {
        setOffeset(totalPages - 1)
    }
    const onPrevious = () => {
        setOffeset(offset == 0 ? 0 : offset - 1)
    }
    const onPreviousFull = () => {
        setOffeset(0)
    }
    function selectPagination(offestBusca) {
        setOffeset(offestBusca)
    }

    function setQuantidadePages(e) {
        setTotalPages(e.target.value)
    }

    return (
        <Row>
            <Col xl={6} lg={6} md={5}>
                <Pagination
                    size={"sm"}
                >
                    <PaginationItem>
                        <PaginationLink
                            first
                            onClick={onPreviousFull}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            previous
                            onClick={onPrevious}
                        />
                    </PaginationItem>
                    {
                        pages.map((e) => {
                            return (
                                <>
                                    <PaginationItem style={{ zIndex: 0 }} active={e["active"]} id={"page-" + e.offset}>
                                        <PaginationLink
                                            onClick={() => selectPagination(e["offset"])}>
                                            {e["text"]}
                                        </PaginationLink>
                                    </PaginationItem>
                                </>
                            )
                        })

                    }
                    <PaginationItem>
                        <PaginationLink
                            next
                            onClick={onNext}
                        />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink
                            last
                            onClick={onNextFull}
                        />
                    </PaginationItem>
                </Pagination>
            </Col>
            <Col xl={4} lg={4} md={4}>
                <div className="d-flex bd-highlight">
                    <div className="p-1 bd-highlight">
                        <Label >
                            Itens por Página
                        </Label>
                    </div>
                    <div className=" px-2 bd-highlight">
                        <Input
                            type="select"
                            size={"sm"}
                            onChange={setQuantidadePages} defaultValue={pageSize}
                        >
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={15}>15</option>
                            <option value={20}>20</option>
                        </Input>
                    </div>

                </div>
            </Col>
            {children}
            <Col>
                <p>
                    Exibindo {totalElements} de {totalElements} linhas
                </p>
            </Col>
        </Row>
    )
}