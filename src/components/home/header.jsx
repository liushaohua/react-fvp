import React, { PropTypes } from 'react';
import { Spin, Alert, Switch, BackTop } from 'antd';
import $ from 'jquery';

function Header({styles}) {

    /**
     * userBtn
     */
    let s_this =  this;
    const userChange = {
        showDrop(ev) {
            let $node = $(ev.target);
            //$node.next().show();
            $('.userDrop').show();
        }
    };

    $(document).click(function (ev) {
        if (!/userDrop/.test($(ev.target).next().attr('class'))) {
            $('.userDrop').hide();
        }
    });

    return (
        <div className={styles.user}>
            <span>刘少华</span>
            <a onClick={(ev) => {userChange.showDrop(ev);}} className={styles.userCur}>...</a>
            <div className={styles.userDrop}>
                <div className="userDrop">
                    <ul>
                        <li><a href="javascript:;">退出</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

Header.propTypes = {
};

export default Header;
