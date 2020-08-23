import React from 'react'
import { connect } from 'react-redux'
import { Container, Row, Col, Card } from 'react-bootstrap'

const TrackList = props => {
  return (
    <div id='trackList'>
      <Container>
        <Row xl={10} lg={5} md={4} xs={2}>
          {props.recs.tracks &&
            props.recs.tracks.map(t => (
              <Col key={t.id}>
                <a
                  href={t.external_urls.spotify}
                  target='_blank'
                  rel='noopener noreferrer'>
                  <Card>
                    <Card.Img src={t.album.images[1].url} />
                    <Card.Body>
                      <Card.Title>{t.name}</Card.Title>
                      <div className='artists'>
                        {t.artists.map(a => (
                          <Card.Subtitle key={a.id}>{a.name}</Card.Subtitle>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </a>
              </Col>
            ))}
        </Row>
      </Container>
      {console.log(props.recs)}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    recs: state.recs,
  }
}

export default connect(mapStateToProps)(TrackList)
