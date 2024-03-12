import Link from "next/link";




export default function Pagination({cPage,tPages}: PaginationProps){
    const mPage = Math.min(tPages, Math.max(cPage+5,10));
    const minPage = Math.max(1,Math.min(cPage-5, mPage-8));
    const pageList : JSX.Element[] = [];
    for (let i = minPage; i < mPage+1; i++) {
        pageList.push(<Link className={`btn join-item ${cPage === i? " pointer-events-none btn-active":""}`} key={i} href={"?page=" + i}>{i}</Link>);
        
    }
    return (
        <>
        <div className="join hidden sm:block">
            {pageList}
        </div>
        <div className="join block sm:hidden">
            {cPage > 1 &&
            <Link className="join-item btn" href={"?page=" + (cPage -1)}>
                ←
            </Link>
            }
            <button className="btn join-item pointer-events-none">
                Page {cPage}
            </button>
            {cPage < tPages &&
            <Link className="join-item btn" href={"?page=" + (cPage +1)}>
                →
            </Link>
            }
        </div>
        </>
    )
}
interface PaginationProps {
    cPage: number;
    tPages: number;
}