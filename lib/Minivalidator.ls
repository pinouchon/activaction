class @Minivalidator
  ->

  countAts: (str) ->
    intersection(str.split(''), [\@]).count

  emailValid: (email) ->
    email?.match(/^\S+@\S+\.\S+$/) && @countAts(email) == 1

  validateAll: (object, fields) ->
    errors = []
    for field, def of fields
      errors = errors ++ @validateField(def.type, field, object[field], def)
    errors

  validateField: (fieldType, fieldName, fieldValue, def) ->
    errors = []
    console.log('validating', fieldName, def)
    console.log(def.required?, !fieldValue?)
    if def.required? && !fieldValue?
      console.log('fieldName', '!!!')
      errors.push {'fieldName': fieldName, error: "#{def.label} est requis"}
    if def.min?
      if (fieldType == \string && fieldValue?.length < def.min) ||
         (fieldType == \integer && fieldValue? < def.min)
        errors.push {'fieldName': fieldName, error: "#{def.label} est trop petit. Minimum: #{def.min}"}
    if def.max?
      if (fieldType == \string && fieldValue?.length > def.max) ||
         (fieldType == \integer && fieldValue? > def.max)
        errors.push {'fieldName': fieldName, error: "#{def.label} est trop grand. Maximum: #{def.max}"}

    if fieldType == \email && !@emailValid(fieldValue)
      errors.push {'fieldName': fieldName, error: "#{def.label} invalide."}
    if fieldType == \password && fieldValue?.length < 3
      errors.push {'fieldName': fieldName, error: "#{def.label} n'est pas assez long"}
    errors