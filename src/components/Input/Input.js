import './Input.css';

function Input({id, className, type, placeholder, value, onChange, validationHtml}) {

    return (
        <div className="form-control">
            <input
                id={id}
                className={className}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {validationHtml}
      </div>
    );
}

export default Input;
