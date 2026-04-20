export interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  className?: string;
}


export interface PaginationControlsPropsToView extends PaginationControlsProps {
  handlePageChange: (newPage: number) => void;
  pageNumbers: number[];
}
