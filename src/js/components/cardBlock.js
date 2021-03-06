import React from "react";
import SingleCard from './singleCard'
import Slider from "react-slick";

class CardBlock extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cards: []
        };

        // this.getAmountCard = this.getAmountCard.bind(this);
    }

    static getDerivedStateFromProps(nextProps) {
        return {cards: nextProps.cards};
    }

    render() {
        const {title} = this.props;


        var settings = {
            dots: true,
            arrows: false,
            infinite: false,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
            responsive: [
                {
                    breakpoint: 1050,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 610,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 1
                    }
                }
            ]
        };

        return (
            <div className="card-block">
                <div className="container">
                    <h2 className="h3Header h2Header-underline">
                        {this.props.title}
                    </h2>
                    <div className="card-block-list">
                        <Slider {...settings}>
                            {this.state.cards ? this.state.cards.map((item) => {
                                return <div className="card-block-list-item" key={item._id}>
                                         <SingleCard card={item}/>
                                       </div>
                            }) : false
                            }
                        </Slider>
                    </div>

                    <div className="link-wrapper">
                        <a href="/allcampaing" className="link-bottom-hover">Посмотреть еще</a>
                    </div>

                </div>
            </div>
        )
    }
};

export default CardBlock;