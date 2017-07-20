module Util exposing ((=>), pair)


infixl 0 =>
(=>) : a -> b -> ( a, b )
(=>) =
    (,)


pair : a -> b -> ( a, b )
pair model cmd =
    model => cmd
