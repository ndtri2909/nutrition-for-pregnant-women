import React from 'react'

const LanguageSelect = () => {
    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="languageDropdown" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img width={30} height={20} src='https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg' /> <span className="ms-1 me-1 d-none d-md-inline-block">English</span>
            </a>
            <div className="dropdown-menu" aria-labelledby="languageDropdown">
                <a href="javascript:;" className="dropdown-item py-2"><img width={30} height={20} src='https://img.freepik.com/free-vector/illustration-uk-flag_53876-18166.jpg' /> <span className="ms-1">English</span></a>
                <a href="javascript:;" className="dropdown-item py-2"><img width={30} height={20} src='https://cdn.pixabay.com/photo/2012/04/10/23/04/vietnam-26834_960_720.png' /> <span className="ms-1">Vietnamese</span></a>
                <a href="javascript:;" className="dropdown-item py-2"><img width={30} height={20} src='https://upload.wikimedia.org/wikipedia/commons/6/62/Flag_of_France.png' /> <span className="ms-1">French</span></a>
            </div>
        </li>
    )
}

export default LanguageSelect