import  React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers,faUser,faBuilding,faMapSigns,faRoad,faListAlt,
    faSitemap,faNewspaper,faCubes,faQuestionCircle,faCog,faBriefcase } from '@fortawesome/free-solid-svg-icons'

const menuIcons = (props) => {
   
    let menuIcon =null;    
    switch (props.icontype) {

        case 'fa fa-users':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faUsers} />;
            break;

        case 'fa fa-user':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faUser} />;
            break;

        case 'fa fa-building':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faBuilding} />;
            break;

        case 'fa fa-map-signs':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faMapSigns} />;
            break;

        case 'fa fa-road':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faRoad} />;
            break;

        case 'fa fa-list-alt':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faListAlt} />;
            break;

        case 'fa fa-sitemap':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faSitemap} />;
            break;

        case 'fa fa-cubes':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faCubes} />;
            break;

        case 'fa fa-newspaper-o':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faNewspaper} />;
            break;

        case 'fa fa-cog':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faCog} />;
            break;

        case 'fa fa-question-circle':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faQuestionCircle} />;
            break;

        case 'fa fa-briefcase':
            menuIcon = <FontAwesomeIcon className="iconNave"  icon={faBriefcase} />;
            break;

        default:
        menuIcon =null
            break;
    }

    return ( <span>  {menuIcon}    </span>  )
       
}

export default menuIcons
