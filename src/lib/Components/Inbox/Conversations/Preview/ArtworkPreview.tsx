import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { Text, TouchableHighlight } from "react-native"

import { PreviewText as P, Subtitle } from "../../Typography"

import { Schema, Track, track as _track } from "../../../../utils/track"

import OpaqueImageView from "lib/Components/OpaqueImageView"
import colors from "lib/data/colors"
import fonts from "lib/data/fonts"
import styled from "styled-components/native"

const Container = styled.View`
  border-width: 1;
  border-color: ${colors["gray-regular"]};
  flex-direction: row;
`

const VerticalLayout = styled.View`
  flex: 1;
  flex-direction: column;
`

const Image = styled(OpaqueImageView)`
  margin-top: 12;
  margin-left: 12;
  margin-right: 12;
  margin-bottom: 12;
  width: 80;
  height: 55;
`

const TextContainer = styled(VerticalLayout)`
  align-self: center;
`

const SerifText = styled(P)`
  font-size: 14;
`

const TitleAndDate = styled.View`
  margin-top: 3;
  margin-right: 12;
  flex-direction: row;
  justify-content: flex-start;
`
interface Props extends RelayProps {
  onSelected?: () => void
}

const track: Track<Props> = _track

@track()
export class ArtworkPreview extends React.Component<Props, any> {
  @track((props, state) => ({
    action_type: Schema.ActionTypes.Tap,
    action_name: Schema.ActionNames.ConversationAttachmentArtwork,
    owner_type: Schema.OwnerEntityTypes.Artwork,
    owner_id: props.artwork._id,
    owner_slug: props.artwork.id,
  }))
  attachmentSelected() {
    this.props.onSelected()
  }

  render() {
    const artwork = this.props.artwork

    return (
      <TouchableHighlight underlayColor={colors["gray-light"]} onPress={() => this.attachmentSelected()}>
        <Container>
          <Image imageURL={artwork.image.url} />
          <TextContainer>
            <SerifText>
              {artwork.artist_names}
            </SerifText>
            <TitleAndDate>
              {/* Nested Text components are necessary for the correct behaviour on both short and long titles + dates */}
              <Text numberOfLines={1} ellipsizeMode={"middle"} style={{ fontFamily: fonts["garamond-italic"] }}>
                {`${artwork.title}`}
                <Text style={{ fontFamily: fonts["garamond-regular"] }}>{`, ${artwork.date}`}</Text>
              </Text>
            </TitleAndDate>
          </TextContainer>
        </Container>
      </TouchableHighlight>
    )
  }
}

export default createFragmentContainer(
  ArtworkPreview,
  graphql`
    fragment ArtworkPreview_artwork on Artwork {
      id
      _id
      title
      artist_names
      date
      image {
        url
      }
    }
  `
)

interface RelayProps {
  artwork: {
    id: string | null
    _id: string | null
    title: string | null
    artist_names: string | null
    date: string | null
    image: {
      url: string | null
    } | null
  }
}
