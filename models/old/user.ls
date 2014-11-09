class @User extends @Minimongoid
  @_collection = Meteor.users

  @fields =
    username:
      type: \string
      label: 'Pseudo'
      min: 3
      max: 255
      required: true

    firstName:
      type: \string
      label: 'Prénom'
      min: 3
      max: 255
      required: true

    lastName:
      type: \string
      label: 'Nom'
      min: 3
      max: 255
      required: true

    gender:
      type: \boolean
      label: 'Sexe'
      required: false
      default: null

    email:
      type: \email
      label: 'email'
      required: true

    password:
      type: \password
      label: 'Mot de passe'
      required: true

    passwordConfirmation:
      type: \passwordConfirmation
      label: 'Confirmer mot de passe'
      required: true

    wantsNewsLetter:
      type: \boolean
      label: 'Recevoir la NewsLetter'
      required: false
      default: false

    terms:
      type: \boolean
      label: 'CGU'
      required: true,
      default: false

  username: null
  firstName: null
  lastName: null
  gender: null
  email: null
  password: null
  passwordConfirmation: null
  wantsNewsLetter: null
  terms: null
  # model relations
#  @belongs_to = [
#    {name: 'user'}
#  ]
#  @embeds_many = [
#    {name: 'ingredients'}
#  ]

  # model defaults
#  @defaults =
#    name: ''
#    cooking_time: '30 mins'

  # Add some validation parameters. As long as the @error() method is triggered, then validation will fail
  validate: ->
    unless @name and @name.length > 3
      @error('name', 'Recipe name is required and should be longer than 3 letters.')

  # generic methods ####################
  validateAll: ->
    (new Minivalidator).validateAll(@, @@fields)
  ######################################

  error_message: ->
    msg = ''
    for i in @errors
      for key,value of i
        msg += "<strong>#{key}:</strong> #{value}"
    msg

  # instance methods
  spicy: ->
    "That's a spicy #{@name}!"

  # is this one of my personal creations? T/F
  myRecipe: ->
    @user_id == Meteor.userId()