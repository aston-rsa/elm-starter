module Main exposing (main)

import Html exposing (Html, div, text)
import Util exposing ((=>))


-- MODEL


type alias Model =
    { isLoading : Bool
    }


init : ( Model, Cmd Msg )
init =
    Model False => Cmd.none



-- UPDATE


type Msg
    = NoOp


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        _ ->
            model => Cmd.none



-- VIEW


view : Model -> Html msg
view model =
    div [] [ text "hey" ]



-- PROGRAM


main : Program Never Model Msg
main =
    Html.program
        { view = view
        , init = init
        , update = update
        , subscriptions = \_ -> Sub.none
        }
