import React from "react";
import styled from "styled-components";
import InfiniteScroll from "react-infinite-scroll-component";

const OffersWrapper = styled.div`
  height: 100%;
  width: 50%;
  overflow-y: scroll;

  /* width */
  ::-webkit-scrollbar {
    width: 12px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .offer-container {
    text-decoration: none;
    color: #5a6371;

    .offer {
      width: 97.5%;
      height: 100px;
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 0 10px 10px 10px;
      border-radius: 6px;
      background: #fff;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05),
        0 1px 5px 0 rgba(0, 0, 0, 0.04);

      &:hover {
        transform: scale(1.0125);
        transition: box-shadow, transform 0.9s cubic-bezier(0.25, 0.8, 0.25, 1);
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.07),
          0 3px 7px 0 rgba(0, 0, 0, 0.06);
      }

      &__border {
        height: 100%;
        width: 7px;
        border-radius: 6px 0 0 6px;
      }

      &__img {
        flex: 0 0 20%;
        width: 20%;
        height: 100%;
        background-size: cover !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
        margin: 0 10px 0 7px;
      }

      .offers__desc-container {
        width: 65%;
      }

      .offer__title {
        font-size: 16px;
      }

      .offer__desc {
        margin: 10px 0;
        font-size: 12px;
        display: flex;
        justify-content: flex-start;

        .offer__localization {
          margin: 0 10px 0 0;
        }

        .offer__type {
          margin: 0 10px 0 0;
        }

        .offer__date {
          margin: 0 10px 0 0;
        }
      }

      .offer__price {
        color: #1ec66c;
        width: 13%;
        justify-self: stretch;
        text-align: right;
        padding-right: 10px;
      }
    }
  }
`;

const OFFERS_CHUNK = 20;

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasMore: true
    };
  }

  loadItems() {
    let offersArr = this.props.scrapes.olxScrape.slice(
      0,
      this.props.offers.length + OFFERS_CHUNK
    );

    if (this.props.offers.length >= this.props.scrapes.olxScrape.length) {
      this.setState({ hasMore: false });
      return;
    } else {
      this.props.handleSettingOffersState(offersArr);
    }
  }

  render() {
    return (
      <OffersWrapper id="listWrapper">
        <InfiniteScroll
          dataLength={this.props.offers.length}
          next={this.loadItems.bind(this)}
          hasMore={this.state.hasMore}
          loader={<h4>Loading...</h4>}
          scrollableTarget="listWrapper"
        >
          {this.props.offers.map(scrape => (
            <a
              className="offer-container"
              href={scrape.link}
              id={scrape.id}
              key={scrape.id}
              onMouseEnter={() =>
                this.props.onMouseEnter(scrape.id, scrape.lat, scrape.long)
              }
              onMouseLeave={() => this.props.onMouseLeave()}
            >
              <div className="offer">
                <div
                  className="offer__border"
                  style={{
                    backgroundColor:
                      scrape.type === "Mieszkania » Wynajem"
                        ? "#fbb540"
                        : scrape.type === "Mieszkania » Sprzedaż"
                        ? "#00a313"
                        : scrape.type === "Mieszkania » Zamiana"
                        ? "#4799cf"
                        : "red"
                  }}
                />
                <div
                  className="offer__img"
                  style={{
                    background:
                      scrape.img !== undefined
                        ? `url(${scrape.img})`
                        : "url(https://1080motion.com/wp-content/uploads/2018/06/NoImageFound.jpg.png)"
                  }}
                />
                <div className="offers__desc-container">
                  <h4 className="offer__title">{scrape.title}</h4>
                  <div className="offer__desc">
                    <p className="offer__localization">{scrape.localization}</p>
                    <p className="offer__type">{scrape.type}</p>
                    <p className="offer__date">{scrape.date}</p>
                  </div>
                </div>
                <p className="offer__price">{scrape.price}</p>
              </div>
            </a>
          ))}
        </InfiniteScroll>
      </OffersWrapper>
    );
  }
}

export default List;
