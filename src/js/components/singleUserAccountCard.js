import React from "react";
import {Link} from 'react-router-dom';

import url from "../modules/url"

class SingleUserAccountCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            card: {}
        };

        // this.getAmountCard = this.getAmountCard.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {card: nextProps.card};
    }

    render() {

        return (
            <div className="single-card"
                //  to={{
                // pathname: `/usercard/${this.state.card._id}`,
                // state: {
                //     id: this.state.card._id
                // }
                // }}
            >
                {this.state.card.photo_preview ? (
                    <img src={ `${url}/uploads/${this.state.card.photo_preview.filename}`} alt=""/>
                ) : false}
                <div className="text-block">
                    <h4>
                        {this.state.card.for_whom_name}
                    </h4>
                    <h6>
                        {this.state.card.text_preview}
                    </h6>

                    <div className="money-count">
                        <progress value={this.state.card.max_sum} max={this.state.card.sum}/>
                        <div className="money-how">
                            <p>
                                Собрали {this.state.card.max_sum}
                            </p>
                            <p>
                                из {this.state.card.sum}
                            </p>
                        </div>
                    </div>



                    {this.state.card.status === 'draft' ? (
                        <div className="btn btn-transparent">Модерация
                            <div className="tooltip-hover">
                                <img src="/img/information.svg" alt="information"/>
                                <p className="information-tooltip">
                                    Ваша заявка проверяется модераторами. Ожидайте письмо на почту.
                                </p>
                            </div>
                        </div>
                    ) : false}

                    {this.state.card.status === 'rev' ? (
                        <Link to={{
                            pathname: `/edit-fundraiser`,
                            state: {
                                id: this.state.card._id
                            }
                        }} className="btn btn-transparent">Редактировать
                            <div className="tooltip-hover">
                                <img src="/img/information.svg" alt="information"/>
                                <p className="information-tooltip">
                                    Ваша заявка возвращена на доработку. Причина указана в письме на почте.
                                </p>
                            </div>
                        </Link>
                    ) : false}

                    {this.state.card.status === 'active' || this.state.card.status === 'verify' ? (
                        <div>
                            <div className="btn btn-transparent"> Забрать деньги
                                <div className="tooltip-hover">
                                    <img src="/img/information.svg" alt="information"/>
                                    <p className="information-tooltip">
                                        Вы можете остановить сбор средств и вывести собранные деньги
                                    </p>
                                </div>
                            </div>
                            <Link className="btn btn-transparent"
                                to={{pathname: `/usercard/${this.state.card._id}`,
                                    state: {
                                        id: this.state.card._id
                                    }}}> Просмотреть на сайте </Link>
                        </div>

                    ) : false}

                    {this.state.card.status === 'ban' ? (
                        <div>
                            <div className="btn btn-transparent">Перемодерация
                                <div className="tooltip-hover">
                                    <img src="/img/information.svg" alt="information"/>
                                    <p className="information-tooltip">
                                        На Вашу заявку пожаловались 3 раза. Она на дополнительной проверке.
                                    </p>
                                </div>
                            </div>
                        </div>

                    ) : false}
                </div>
            </div>
        )
    }
};

export default SingleUserAccountCard;